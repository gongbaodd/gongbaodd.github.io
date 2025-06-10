---
type: post
category: tech
tags:
    - langchain
---
# LangChain

I have tried many no code tools such as Flowise, Dify and n8n. However, under the hood, they all base on [LangChain](https://www.langchain.com/). LangChain is like a compatible layer for all kinds of LLMs, it provides a hub of different prompt templates, vector database drivers, and workflow system called [LangGraph](https://www.langchain.com/langgraph), an online log service called [LangSmith](https://www.langchain.com/langsmith).

Sadly, all the no code tools cannot export their workflow to langChain. And writing a langGraph is not intuitive. There is an editor, [langGraph studio](https://github.com/langchain-ai/langgraph-studio), which is MacOS only and still in beta.

The tutorials in langGraph are cutting edge, there is a sql prompt, that can make SQL queries, which to me is some kind of risky. It is quite dangerous to let LLMs to control the database. 