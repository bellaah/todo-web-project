class observable {
    constructor() {
        this.observers = [];
        this.state = null; 
        this.data;
        this.publishers = [];
    }
    add(observer) {
        this.observers.push(observer);
    }
    notify() {
        this.observers.forEach(observer => {
          observer.update(this.state);
        });
    }
    changeState(newState) {
        this.state = newState;
        this.notify();
    }
    subscribe(publisher) {
        this.publishers.push(publisher);
        publisher.add(this);
    }
    update(state) {
        this.data = state;  
    }
}

export default observable;