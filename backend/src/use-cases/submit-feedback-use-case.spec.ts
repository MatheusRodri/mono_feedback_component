import { SubmitFeedbacksUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMail = jest.fn();

const submitFeedback = new SubmitFeedbacksUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMail }
)

describe("Submit feedback", () => {
    it("should be able to submit feedback", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "teste",
            screenshot: "data:image/png;base64,teste.jpg",
        })).resolves.not.toThrow();


        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMail).toHaveBeenCalled();''
    })
    it("should not be able to submit feedback without type", async () => {

        await expect(submitFeedback.execute({
            type: "",
            comment: "teste",
            screenshot: "data:image/png;base64,teste.jpg",
        })).rejects.toThrow();
    })
    it("should not be able to submit feedback with a invalid screenshot", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,teste.jpg",
        })).rejects.toThrow();
    })
    it("should not be able to submit feedback without type", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "teste",
            screenshot: "d",
        })).rejects.toThrow();
    })
})