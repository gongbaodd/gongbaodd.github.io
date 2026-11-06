---
type: post
category: book
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1793979155/Screenshot_20261106_103120_qzqvmg_qdcjwl.png
    alt: learning ddd
---

# Learning Domain-Driven Design

Domain-Driven Design (DDD) is a topic I have always heard about since the microservice era. We used it during my work at AfterShip. However, I never learned it theoretically from books.

Because of the viral progress in vibecoding, DDD can be a great architecture for shrinking the agent context and building boundaries between agents.

## Structure

The book includes four parts:

- Strategic Design: Introduction of domains and how to set domain boundaries
- Tactical Design: How domains connect to each other
- Real-world practice: How to build from scratch or how to refactor projects
- Other methodologies: Comparing DDD with microservices, event-driven architecture, and data mesh

## Domain types

There are three domain types: core, generic, and supporting. These three are mentioned throughout the book.

- Core domain is what actually makes money in the project.
- Supporting domain is what is easy to implement but does not "make the project win".
- Generic domain is the common gadgets among all similar projects; sometimes you can find an open-source project to handle it.

## Ubiquitous Language & Bounded Context

Use a bounded context to build a ubiquitous language and form one domain. A bounded context serves only one team, but one team can own multiple bounded contexts.

Bounded contexts have the following relationships:

Partnership, Shared kernel, Conformist (one consumes the other), Anticorruption layer (an adapter from one to another), Open-host service (a public service), and Separate ways (everything is implemented inside its own context).

It is very costly to use "separate ways" on a core domain, and a core domain usually uses an "anticorruption layer" to protect itself. Be cautious with "shared kernel", as multiple teams work on the same context.

## Patterns for business logic

Simple ETL (Extract, Transform, Load) uses `Transaction Script`, while CRUD (Create-Read-Update-Delete) uses `Active record`, which maps DB tables into objects with methods.

Neither of the above should be applied to core domains, but they can be used on supporting domains.

Complex business logic consists of three kinds of objects: value objects (properties like currency and address), aggregates (collections of value objects), and domain services (which handle multiple aggregates).

Value objects are immutable, and aggregates should be as small as possible. One instance of an aggregate should be committed in one transaction. An aggregate encapsulates all its logic manipulations inside itself, whereas an active record can have logic outside its boundary.

The `Event sourcing` pattern describes business logic over time. It stores the events that cause changes to aggregates (events are the source of truth). Compared with patterns that store states, this pattern is much easier to scale. An event uses value objects to describe itself. Events are immutable records and should not be described with aggregates, which have a life cycle.

There are three architectures:

- Layered architecture separates logic into layers, with data in the bottom layer.
- Ports & adapters architecture uses IoC (Inversion of Control) and separates data from implementations.
- CQRS (Command Query Responsibility Segregation) architecture separates reading and writing of data. The write process returns directly after writing, and another process updates the materialized view for users to read.

Hence, active records can be used in layered or CQRS architecture.

In modern systems, reads are needed more than writes, and CQRS makes read logic scalable. But the customer must be able to tolerate data that is not the latest.

The patterns for the anticorruption layer and open-host services are outbox and saga.

Outbox is a pub-sub system that can be implemented with a message bus or callbacks.

Saga directly listens to domain events and responds to them linearly and statelessly. In contrast, a process manager is a state machine that decides what to do next.

## Real-world practice

The third part talks about how to choose context boundaries and determine the architecture pattern and the testing plan.

It then discusses which solutions to use when a project changes. For example, when the organization grows, the relationship pattern changes from shared kernel to conformist, anticorruption layer, or open-host service. Or when new features become harder and more frequent, a supporting domain is becoming a core domain.

EventStorming sessions help teams form a ubiquitous language.

The strangler pattern is used for transforming a legacy system into a new one. The pattern allows teams to share the database and duplicate the implementations.

## Microservices

All microservices are bounded contexts. Microservices are the smallest unit of context boundaries.

## Event-Driven Architecture (EDA)

EDA is for events crossing component boundaries. Event sourcing is for the events inside an aggregate.

There are three types of events:

- Event notification: only describes what has happened.
- Event-carried state transfer: a snapshot of state after one event.
- Domain event: what happened, plus some logic data.

## Data Mesh

Online Transaction Processing (OLTP) and Online Analytical Processing (OLAP): OLTP only records transaction data, while OLAP can give analytical results. The CQRS pattern is essential for data mesh.

## Conclusion

The book answered many "why" questions I had during my work. However, many of the concepts are quite hard to understand and take a longer time to process.

The exercises in chapter 16-2 are obviously wrong, and chapter 3 is missing some answers.
