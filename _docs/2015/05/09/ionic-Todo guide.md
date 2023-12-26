---
type: post
category: fe
---

# ionic官方Todo Guide
>代码在<br>https://github.com/gongbaodd/myExperinments/tree/ionic_todo
一直想写一个app，但是懒得设计，看到ionic官方有个guide而且没有中文版，所以写一个。

---
1. 在head中添加对应的css和js
```html
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
        <title></title>
        <link href="lib/ionic/css/ionic.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <script src="lib/ionic/js/ionic.bundle.js"></script>
        <script src="cordova.js"></script>
        <script src="js/app.js"></script>
```        
2. body添加controller
```html
        <body ng-app="todo" ng-controller="TodoCtrl"> 
```
        
3. Todo的界面，分别是左边栏（负责分配todo的类型——projects）和主界面（负责分配每一个todo项——tasks）
```html
        <ion-side-menus>
            <ion-side-menu-content>...</ion-side-menu-content>
            <ion-side-menu side="left">...</ion-side-menu>
        </ion-side-menus>
```      
4. Todo的行为
```js       
        angular.module('todo',['ionic'])
        .factory('Projects',function() {
            ...
        }）
        .controller('TodoCtrl',function($scope,$timeout,$ionicModal,Projects,$ionicSideMenuDelegate) {
            ...
        })
```
5. 左边栏结构
```html
        <ion-header-bar class="bar-dark">
            <h1 class="title">Projects</h1>
            <button class="button button-icon ion-plus" ng-click="newProject()"></button>
        </ion-header-bar>
        <ion-content scroll="false">
            <ion-list>
                <ion-item ng-repeat="project in projects" ng-click="selectProject(project,$index)" ng-class="{active:activeProject == project}">
                    {{project.title}}
                </ion-item>
            </ion-list>
        </ion-content>
```        
6. 左边栏行为
```js
        .factory('Projects',function() {
        return {
            all:function(){
                var projectString = window.localStorage['projects'];
                if(projectString){
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save:function(projects){
                window.localStorage['projects'] = angular.toJson(projects);
            },
            newProject:function(projectTitle){
                return {
                    title:projectTitle,
                    tasks:[]
                };
            },
            getLastActiveIndex:function(){
                return parseInt(window.localStorage['lastActiveProject'])||0;
            },
            setLastActiveIndex:function(index){
                window.localStorage['lastActiveProject'] = index;
            }
        }
        })
```        
7. 主界面结构
```html
        <ion-header-bar class="bar-dark">
            <h1 class="title">Todo</h1>
            <!--                New Task button-->
            <button class="button button-icon" ng-click="newTask()">
                <i class="icon ion-compose"></i>
            </button>
        </ion-header-bar>
        <ion-content scroll="false">
        <!--                our list and list items-->
            <ion-list>
               <ion-item ng-repeat="task in activeProject.tasks">
                   {{task.title}}
               </ion-item>
            </ion-list>
        </ion-content>
```        
8. 主界面行为
```js
        .controller('TodoCtrl',function($scope,$timeout,$ionicModal,Projects,$ionicSideMenuDelegate) {
    
        var createProject = function(projectTitle){
            var newProject = Projects.newProject(projectTitle);
            $scope.projects.push(newProject);
            Projects.save($scope.projects);
            $scope.selectProject(newProject,$scope.projects.length-1);
        }
    
        $scope.projects = Projects.all();
    
        $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];
    
        $scope.newProject = function() {
            var projectTitle = prompt("Project name");
            if(projectTitle){
                createProject(projectTitle);
            }
        };
    
        $scope.selectProject = function(project,index){
            $scope.activeProject = project;
            Projects.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        };
    
        $ionicModal.fromTemplateUrl('new-task.html',function(modal) {
            $scope.taskModal = modal;
        },{
            scope:$scope,
            animation:'slide-in-up'
        });
    
        $scope.createTask = function(task) {

            if(!$scope.activeProject||!task){
                return ;
            }
            $scope.activeProject.tasks.push({
                title:task.title
            });
            $scope.taskModal.hide();
        
            Projects.save($scope.projects);
        
            task.title = "";
        };
    
        $scope.newTask = function() {
            $scope.taskModal.show();
        };
        $scope.closeNewTask = function() {
            $scope.taskModal.hide();
        };
        $scope.toggleProjects = function() {
            $ioncSideMenuDelegate.toggleLeft();
        };
    
        $timeout(function() {
            if($scope.projects.length == 0){
                while(true){
                    var projectTitle = prompt('Your first project title');
                    if(projectTitle){
                        createProject(projectTitle);
                        break;
                    }
                }
            }
        })
        });
```        
9. 新建项目的模态对话框
```html
        <script id="new-task" class="html" type="text/ng-template">
            <div class="modal">
            <!--        Modal header bar-->
                <ion-header-bar class="bar-secndary">
                    <h1 class="title">New Task</h1>
                    <button class="button button-clear button-positive" ng-click="closeNewTask()">Cancel</button>
                </ion-header-bar>
                <!--        Modal content area-->
                <ion-content>
                    <form action="" ng-submit="createTask(task)">
                        <div class="list">
                        <label for="" class="item item-input">
                            <input type="text" placeholder="What do you need to do?" ng-model="task.title">
                        </label>
                        </div>
                        <div class="padding">
                            <button type="submit" class="button button-block button-positive">Create Task</button>
                        </div>
                    </form>
                </ion-content>
            </div>
        </script>
```