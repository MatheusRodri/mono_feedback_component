import express from 'express';
import { prisma } from './prisma';
import nodemailer from "nodemailer"

const app = express();


app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d0ae55b021aac9",
        pass: "1d97169a1851c6"
    }
});

app.post("/feedbacks", async (req, res) => {

    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
        from:'Equipe Feeget <oi@feeget.com>',
        to:"Matheus Rodrigues <matheus.rj25@hotmail.com>",
        subject:"New Feedback",
        html: [
            `<div style="font-family: sans-serif; font-size:16px; color:#111;">`,
            `<p> Tipo do feedback ${type} </p>`,
            `<p> Comentário ${comment} </p>`,
            `</div>`
        ].join("\n")
    })
    return res.status(201).json({ data: feedback });
})
app.listen(3333, () => {
    console.log("RUNNING")
})