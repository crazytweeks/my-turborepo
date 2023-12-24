const timeOut = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
}

const main = async () => {
    await timeOut();
    console.log('Hello world');
}

main();