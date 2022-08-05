$.confirm = function (options){
    return new Promise((resolve, reject)=>{
       const modal = $.modal({
            title: options.title,
            closable: false,
            width: "300px",
            footerButtons: [{
                text: "Удалить", type: "primary", handler() {
                    modal.close()
                    resolve(true)
                }
            },
                {
                    text: "Отмена", type: "primary", handler() {
                        resolve(false)
                        modal.close()
                    }
                }]
        })
        modal.open()
        modal.onClose(modal.destroy)
    })
}