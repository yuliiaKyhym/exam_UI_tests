///<reference types = "cypress"/>

export function headlessLogin(user) {

    //Send request with credentials
    let token
    let bid
    cy.request({
        method: 'POST',
        url: '/rest/user/login',
        form: true,
        body: {
            email: user.email,
            password: user.password,
        }

        //Set authentication token
    }).then(response => {
        token = response.body.authentication.token
        bid = response.body.authentication.bid
        cy.setCookie('token', token)
        window.localStorage.setItem('token', token)
        window.sessionStorage.setItem('bid', bid)
    })

    //Check that token exists in local storage
    cy.getAllLocalStorage()
        .should('exist').then((result) => {
            expect(result).to.eql({
                'https://juice-shop-sanitarskyi.herokuapp.com': {
                    token: token,
                },
            })
        })
}