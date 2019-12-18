---
type: post
category: tech
---
# AWS SQS 相关状态说明

+ Message Available:  SQS 客户端可以获取到的消息, 即 Visible Messages

+ Messages in Flight: 消息被 SQS 收取了之后，由 Available 转为 In Flight, 该状态的消息不能被客户端接收到

+ Visibility Timeout:  消息停留在 In Flight 状态的时间, 如果在 Timeout 之前未删除这个消息，该消息重新变为 Available 状态

所以在Visibility Timeout时间内，同一条消息是不会被多个客户消费的，适当延长Visibility Timeout可避免单条消息被重复处理。