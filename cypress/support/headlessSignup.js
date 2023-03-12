///<reference types = "cypress"/>

export function headlessSignup(user) {

    cy.request({
        method: 'POST',
        url: '/api/Users/',
        form: true,
        body: {
            email: user.email,
            password: user.password,
            passwordRepeat: user.password,
            securityAnswer: "123",
            securityQuestion: {
                id: '1',
                question: 'Your eldest siblings middle name?'
            }
        }
    }).then(response => {
        expect(response.status).to.be.equal(201)
        expect(response.statusText).to.be.equal('Created')
        expect(response.body.status).to.be.equal('success')
        expect(response.body.data.email).to.be.equal(user.email)

        let userId = response.body.data.id

        cy.request({
            method: 'POST',
            url: '/api/SecurityAnswers/',
            form: true,
            body: {
                securityQuestionId: '1',
                UserId: userId,
                answer: "123"

            }
        }).then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.statusText).to.be.equal('Created')
            expect(response.body.status).to.be.equal('success')
        })

    })

}