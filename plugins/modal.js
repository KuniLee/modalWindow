function _createModal({title, closable = true, content, width, footerButtons = []}) {
    const MODAL_TEMPLATE = `  <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">${title || "Окно"}</span>
                <span data-close="true" class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
               ${content || ""}
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>`

    const modal = document.createElement('div')
    modal.classList.add("vmodal")
    modal.insertAdjacentHTML('afterbegin', MODAL_TEMPLATE)
    modal.querySelector(".modal-window").style.width = width
    document.body.prepend(modal)
    const footer = modal.querySelector(".modal-footer")
    footerButtons.forEach((btn, index) => {
        footer.insertAdjacentHTML("beforeend", `<button data-btn="${index}" type="button" class="btn btn-${btn.type}">${btn.text}</button>`)
        footer.querySelector(`[data-btn='${index}']`).onclick = btn.handler || null

    })

    !closable && (modal.querySelector(".modal-close").hidden = true)

    return modal
}


$.modal = function (options) {
    let onClose = function () {
    }
    const ANIMATION_SPEED = 500
    let closing = false
    let destroyed = false
    const $modal = _createModal(options)

    const modal = {
        open() {
            if (!closing && !destroyed) {
                setTimeout(() => {
                    $modal.classList.add("open"), 0
                })
            } else {
                return "unable"
            }
        }
        ,
        close() {
            closing = true
            $modal.classList.add("hiding")
            $modal.classList.remove("open")
            setTimeout(() => {
                $modal.classList.remove("hiding")
                closing = false
                onClose()
            }, ANIMATION_SPEED)
        }
    }

    const listener = event => {
        event.target.dataset.close && modal.close()
    }


    $modal.addEventListener("click", listener)

    Object.assign(modal, {
        destroy() {
            $modal.removeEventListener('click', listener)
            $modal.parentNode.removeChild($modal)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('.modal-body').innerHTML = html
        },
        onClose(handler) {
            if (typeof handler === "function") {
                onClose = handler
            }
        }
    })
    return modal
}
