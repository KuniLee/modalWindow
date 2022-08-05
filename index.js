const fruits = [
    {
        id: 1,
        title: 'Яблоки',
        price: 20,
        img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'
    },
    {
        id: 2,
        title: 'Апельсины',
        price: 30,
        img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'
    },
    {
        id: 3,
        title: 'Манго',
        price: 40,
        img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'
    },
]

// const options = {
//     title: "Это заголовок",
//     closable: true,
//     content: `
// <p>Modal is working</p>
// <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum est ipsam necessitatibus optio quam quo rem sed sequi, vero?</p>
// `,
//     width: "700px",
//     footerButtons: [{
//         text: "OK", type: "primary", handler() {
//             console.log("ОК btn clicked")
//             modal.close()
//         }
//     },
//         {
//             text: "Cancel", type: "danger", handler() {
//                 console.log("Cancel btn clicked")
//                 modal.close()
//             }
//         }]
// }

function render() {
    const wrap = document.createElement('div')
    wrap.classList.add('row')
    fruits.forEach(fruit=>{
        const card = document.createElement('div')
        card.classList.add('col-4')
        card.innerHTML = `<div class="card" data-id="${fruit.id}" >
<img src="${fruit.img}" style="height: 300px"  class="card-img-top" >
<div class="card-body">
<h5 class="card-title">${fruit.title}</h5>
<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
<a href="#" class="btn btn-primary">Цена</a>
<a href="#" class="btn btn-danger">Удалить</a>
</div>
</div>`
        wrap.insertAdjacentElement("beforeend", card)
    })
    document.querySelector('.container').insertAdjacentElement("beforeend", wrap)

}



render()
const cards = document.getElementsByClassName('card')

const buttonClick = function (ev) {
    const fruit = fruits.find(el => el.id == this.dataset.id)
    if (ev.target.classList.contains('btn-primary')) {
        const modal = $.modal({
            title: "Цена",
            closable: true,
            content: `
                        <span>Цена на ${fruit.title}:</span>
                        <span>${fruit.price} руб.</span>
                        `,
            width: "500px",
            footerButtons: [{
                text: "OK", type: "primary", handler() {
                    modal.close()
                }
            }]
        })
        modal.onClose(modal.destroy)
        modal.open()
    }
    if (ev.target.classList.contains('btn-danger')) {

        const removeCard = (enable) => {
            enable && this.parentNode.parentNode.removeChild(this.parentNode)
        }
        $.confirm({
            title: "Удалить?"
        }).then(removeCard)
    }

}
for (let card of cards) {
    card.addEventListener('click', buttonClick)
}



