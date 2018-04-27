const Message = require('../models/message');
const Conversation = require('../models/conversation');
const { User } = require('../models/user');

exports.getConversation = (req, res, next) => {
    let user = req.query.user;
    let recipent = req.query.recipent;
    
    Conversation
        .find({participants: {$all:[user, recipent]}})
        .select('_id participants')
        .exec((err, conversations) => {
            if(err) return next(err);
            res.status(200).send(conversations);
    })
}

exports.getConversations = (req, res, next) => {
    let userid = req.query.id;

    Conversation
        .find({participants: userid})
        .select('_id participants')
        .exec((err, conversations) => {
            if(err) return res.status(400).send(err);
            const fullConversations = [];
            conversations.forEach((conversation) => {
                Message.find({conversationId: conversation._id})
                    .sort('-createdAt')
                    .limit(20)
                    .exec((err, messages) => {
                        if(err) return res.status(400).send(err);
                        fullConversations.push({participants: conversation.participants,id: conversation._id, messages: messages})
                        if (fullConversations.length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                          }
                    })
                    
            })   
        })
};

exports.startConversation = (req, res, next) => {
    const conversation = new Conversation({
        participants: [req.body.userId, req.body.recipientId]
    });
    
    conversation.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            newConversation: doc
        });
    })
};

exports.newMessage = (req, res, next) => {
    const message = new Message(req.body);

    message.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            message: doc
        });
    })
};

exports.getConversationMessages = (req, res, next) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    let id = req.query.id;

    Message.find({conversationId: id}).skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
};