
const btn = document.querySelector('#btn-generator');
const adviceIdElement = document.querySelector('#advice-id');
const adviceElement = document.querySelector('#advice');



const htmlElem = document.querySelector('html')
const themeButton = document.getElementById('theme-toggle')
const sunIcon = themeButton.querySelector('.sun');
const moonIcon = themeButton.querySelector('.moon');


async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');

        if(!response.ok){
            throw new Error('Response not OK');
        }
        const data = await response.json();
            if(data['message']){
                console.info('not ok');
                throw new Error(data.message.text);
            }else{
                console.info('ok');
                updateDom(data.slip);

            }
        
    }catch(err){
        adviceIdElement.classList.add('error');

        updateDom({'id':'404','advice':'An error occurred while fetching advice. Please try again.'})
        console.error(err);
        
    }
    
}

function updateDom(data){
    const {id,advice} = data;
    adviceIdElement.textContent = `advice #${id}`;
    adviceElement.textContent = `"${advice}"`;

}





function initTheme() {
    const currentTheme = localStorage.getItem("theme") ?? "dark"
    htmlElem.classList.add(currentTheme);
    if (currentTheme === "dark") {
        moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
        }
}

function setTheme() {
    const currentTheme = localStorage.getItem('theme') ?? "dark"
    const newTheme = currentTheme === 'dark' 
        ? 'light' 
        : 'dark'

    htmlElem.classList.replace(currentTheme,newTheme)

    localStorage.setItem('theme',newTheme)
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
    
}



themeButton.addEventListener('click', () => {
    setTheme()
})

btn.addEventListener('click', () => {
    if(adviceIdElement.classList.contains('error')){ adviceIdElement.classList.remove('error');}
    fetchAdvice();
})


initTheme();
fetchAdvice();












