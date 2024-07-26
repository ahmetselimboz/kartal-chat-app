import axios from "axios"
import jsonwebtoken from "jsonwebtoken"

export const sendEmail = async (data: any) => {
    try {
        
        const jwtToken = jsonwebtoken.sign(
            data,
            process.env.NEXT_PUBLIC_CONFIRM_MAIL_JWT_SECRET as string,
            { expiresIn: "1d" }
        );


        const result = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/send`, {
            email: data.email,
            link: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/email-dogrulama?id=${jwtToken}`
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        
        return true
    } catch (error) {
        console.log("SendMail: ", error)
    }
}

export const updateEmail = async (id: any) => {
    try {

        var decoded = jsonwebtoken.verify(id as string, process.env.NEXT_PUBLIC_CONFIRM_MAIL_JWT_SECRET as string) as any


        if (decoded.name === "JsonWebTokenError") {
            return {
                status: false,
                message: "Doğrulama Linki Hatalı veya Süresi Geçmiş! Lütfen Tekrar Kaydolunuz!"
            }
        }

        const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/email-confirmed`, decoded)

        if (!result.data.data.success) return {
            status: false,
            message: "Bir Hata Oluştu! Lütfen Tekrar Deneyiniz!"
        }

        return {
            status: true,
            message: "",
            userId:decoded.id
        }
    } catch (error: any) {
        console.log("SendMail: ", error)

        if (error.name === "JsonWebTokenError") {
            return {
                status: false,
                message: "Doğrulama Linki Hatalı veya Süresi Geçmiş! Lütfen Tekrar Kaydolunuz!"
            }
        }
        return false
    }
}
