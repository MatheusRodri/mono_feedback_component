import { MailAdapater } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";

interface SubmitFeedbacksUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbacksUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapater
    ) { }


    async execute(request: SubmitFeedbacksUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error("Type are required");
        }
        if (!comment) {
            throw new Error("Comment are required");
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot");
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size:16px; color:#111;">`,
                `<p> Tipo do feedback ${type} </p>`,
                `<p> Comentário ${comment} </p>`,
                screenshot ? `<img src="${screenshot}"` : "",
                `</div>`
            ].join("\n")
        })
    }
}