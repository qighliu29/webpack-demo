// import styles from './main.css';

export default (text = 'Hello world') => {
    const element = document.createElement('div');

    element.innerHTML = text;
    // element.className = styles.redButton;
    // element.className = 'pure-button';
    element.className = 'fa fa-hand-spock-o fa-1g';

    element.onclick = () => {
        import ('./lazy').then((lazy) => {
            element.textContent = lazy.default;
        }).catch((err) => {
            console.error(err);
        });
    };

    return element;
};