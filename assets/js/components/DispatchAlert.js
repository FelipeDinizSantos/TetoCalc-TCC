// Código reutilizavel

export class DispatchAlert{
    constructor(type, message = 'Hello, World!'){
        this.type = type;
        this.message = message;
        this.main();
    };

    main(){
        switch(this.type){
            case 'alert':
                window.alert(this.message);
                break;
            case 'confirm':
                window.confirm(this.message);
                break;
            case 'prompt':
                window.prompt(this.message);
                break;
            default:
                alert('Hello, World!');
        }
    };
}