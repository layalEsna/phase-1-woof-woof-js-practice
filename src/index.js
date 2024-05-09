document.addEventListener('DOMContentLoaded', () => {

    const dogDiv = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')

    fetch('http://localhost:3000/pups')
        .then(res => {
            return res.json()
        })
        .then(data => {
            data.forEach(dog => {
                const span = document.createElement('span')
                span.textContent = dog.name
                dogDiv.appendChild(span)

                span.addEventListener('click', () => {
                    dogInfo.innerHTML = `
                    <img src=${dog.image} />
                    <h2>${dog.name}s</h2>`
                    const btn = document.createElement('button')
                    if (dog.isGoodDog === true) {
                        btn.textContent = 'Good Dog!'
                    } else {
                        btn.textContent = 'Bad Dog!'
                    }
                    dogInfo.appendChild(btn)

                    //let something = false
                    btn.addEventListener('click', () => {
                        dog.isGoodDog = !dog.isGoodDog

                        // something = !something
                        //dog.isGoodDog = something
                        if (dog.isGoodDog) {
                            btn.textContent = 'Bad Dog!'
                        }
                        else {
                            btn.textContent = 'Good.Dog!'
                        }

                        fetch(`http://localhost:3000/pups/${dog.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify({
                                'name': dog.name,
                                'image': dog.image,
                                "isGoodDog": dog.isGoodDog
                            })
                        })
                            .then(res => {
                                return res.json()
                            })
                            .then(data => {
                                dog.isGoodDog = data.isGoodDog
                            })
                    }
                    )

                })
            })
        })

    const btnF = document.querySelector('#good-dog-filter')

    btnF.addEventListener('click', () => {
        if (btnF.textContent === 'Filter good dogs: OFF') {
            btnF.textContent = 'Filter good dogs: ON'
        } else {
            btnF.textContent = 'Filter good dogs: OFF'
        }
    })
})
