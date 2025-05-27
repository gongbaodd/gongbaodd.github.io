---
type: post
category: tech
---

# Unity Test Framework

I was trying to write unit test for my Unity project. Well, I did not finished. But here are some notes I think I will consider in the future.

When finished make the test folder. There will be a test assembly definition file created. A new C# file with the same file name is needed to add manually(It feels like a bug, I tried on Unity 6 and 6.1, they all need manually added).

```C#
using NUnit.Framework;
using UnityEngine;

namespace Tests
{
    public class ExampleTests
    {
        [Test]
        public void AlwaysPasses()
        {
            Assert.IsTrue(true);
        }
    }
}
```

Another thing, a new assemble definition file is needed to be created as GameRuntime. And add the GameRuntime assembly definition to the test assembly definition. Or the test can not find the classes in the game.

Then, the hard one. To test the game, many unity built-in classes are needed to be mocked. The easiest way is to use MVVM to decouple the logic. Then only test the vm part. It needs me to make a lot changes to the old code, so I decided to give up this time.

```C#
public class ScoreViewModel
{
    public event Action<int> OnScoreChanged;
    private int _score;

    public int Score
    {
        get => _score;
        set
        {
            if (_score == value) return;
            _score = value;
            OnScoreChanged?.Invoke(_score);
        }
    }

    public void IncreaseScore() => Score++;
}

public class ScoreView : MonoBehaviour
{
    public UIDocument uiDocument;
    private Label scoreLabel;
    private ScoreViewModel viewModel;

    void Awake()
    {
        scoreLabel = uiDocument.rootVisualElement.Q<Label>("scoreLabel");

        viewModel = new ScoreViewModel();
        viewModel.OnScoreChanged += UpdateScoreUI;

        // Example: Update score
        viewModel.IncreaseScore(); 
    }

    private void UpdateScoreUI(int score)
    {
        scoreLabel.text = $"Score: {score}";
    }
}
public class ScoreViewModelTests
{
    [Test]
    public void IncreaseScore_IncreasesScore()
    {
        var viewModel = new ScoreViewModel();
        viewModel.Score = 0;

        viewModel.IncreaseScore();

        Assert.AreEqual(1, viewModel.Score);
    }

    [Test]
    public void OnScoreChanged_IsInvoked_WhenScoreChanges()
    {
        var viewModel = new ScoreViewModel();
        bool wasCalled = false;
        viewModel.OnScoreChanged += score => wasCalled = true;

        viewModel.Score = 5;

        Assert.IsTrue(wasCalled);
    }
}
```