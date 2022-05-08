import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailAdapter } from "../adapters/mail-adapter";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
} 

export class SubmitFeedbackUseCase {
    // private feedbackRepository: FeedbacksRepository

    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if (!type) {
            throw new Error('Type is required')
        }

        if (!comment) {
            throw new Error('Comment is required')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        }

        await this.feedbackRepository.create({ 
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback', 
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">Tipo de feedback: ${type}</p>`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : null,
                `</div>`,
            ].join('\n')
        })

    }
}