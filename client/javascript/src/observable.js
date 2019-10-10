class observable {
    constructor() {
        this.observers = [];
        this.state = null; 
        this.publishers = [];
    }
    add(observer) {
        this.observers.push(observer);
    }
    subscribe(publisher) {
        this.publishers.push(publisher);
        publisher.add(this);
    }
    notify(type,data) {
        this.observers.forEach(observer => {
          observer.update(type,data);
        });
    }
    changeState(type,data) {
        this.notify(type,data);
    }
    update(type,data) {
        this.state = {type,data};  
    }
}

export default observable;