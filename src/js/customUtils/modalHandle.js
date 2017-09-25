/* 
    global
    document: false
*/ 

export default class ModalHandle {
    callBacks = [];
    suggestionCallback = undefined;
    editorFlag = false;
    suggestionFlag = false;

    closeAllModals = (event) => {
        this.callbacks.forEach(callback => {
            callback(event);
        });
    }

    init = (id) => {
        const wrapper = document.getElementById(id);
        if (wrapper) {
            wrapper.addEventListener('click', () => {
                this.editorFlag = true;
            });
        }
        if (document) {
            document.addEventListener('click', () => {
                if (!this.editorFlag) {
                    this.closeAllModals();
                    if (this.suggestionCallback) {
                        this.suggestionCallback();
                    }
                } else {
                    this.editorFlag = false;
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.closeAllModals();
                }
            });
        }
    }

    onEditorClick = () => {
        this.closeModals();
        if (!this.callBacks.suggestion && this.suggestionCallback) {
            this.suggestionCallback();
        } else {
            this.suggestionFlag = false;
        }
    }

    registerCallback = (callBack) => {
        this.callBacks.push(callBack);
    }

    deregisterCallback = (callBack) => {
        this.callBacks.filter(cb => cb !== callBack);
    }

    setSuggestionCallback = (callBack) => {
        this.suggestionCallback = callBack;
    }

    removeSuggestionCallback = () => {
        this.suggestionCallback = undefined;
    }

    onSuggestionClick = () => {
        this.suggestionFlag = true;
    }
}
