import express from "express";
import { MessageModel } from "../models";

class MessageController {

    index(req: express.Request, res: express.Response) {
        const dialogId: any = req.query.dialog;

        MessageModel.
            find({ dialog: dialogId }).
            populate(["dialog"]).
            exec((err: any, messages: any) => {
                if (err) {
                    return res.status(404).json({
                        message: "Messages not found"
                    });
                }
                return res.json(messages)
            });
    }

    // show(req: express.Request, res: express.Response) {
    //     const id: string = req.params.id
    //     DialogModel.findById(id, (err: any, user: any) => {
    //         if (err) {
    //             return res.status(404).json({
    //                 message: "User Not Found"
    //             });
    //         }
    //         res.json(user);
    //     });
    // }

    // getMe() {
    //     // TODO: return my id profile
    // }

    create(req: express.Request, res: express.Response) {

        const userId = "60d6390a1d2596120c6e0400";

        const postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            user: userId,
        }
      
        const messages = new MessageModel(postData);
      
        messages.save().then((obj: any) => {
          res.json(obj)
        }).catch((reason: any) => {
          res.json(reason)
        });
    }

    delete(req: express.Request, res: express.Response) {

        const id: string = req.params.id

        MessageModel.findOneAndRemove({ _id: id }).then((message: any) => {
                res.json({
                    message: "Messages deleted"
                })
            })
            .catch(() => {
                res.json({
                    message: "Messages not found"
                })
            })
    }
}

export default MessageController;