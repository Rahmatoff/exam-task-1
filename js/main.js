const search = document.querySelector('#search-input');
const searchForm =document.querySelector('#search-form');
const results = document.querySelector('#results');



searchForm.addEventListener('submit', (e)=>{
    const searchInp = search.value;
    e.preventDefault();
    (async () => {
        try{
          if(searchInp != ""){
            const RESPONSE = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInp}`);
            const DATA = await RESPONSE.json();
            render(DATA);
            }
        } catch (error) {
            alert("Sorry, The word is not found")
        }
    })();

})

function render(data){
    data.forEach(dataEl => {
        let header = document.createElement('h2');
        results.innerHTML =
        `<h2 class="word-calls">${dataEl.word}    ${dataEl.phonetic ? dataEl.phonetic : "" }</h2>`;

        
        for (const iterator of dataEl.meanings) {
            results.innerHTML +=
            ` <p class="results-definition">
            ${iterator.definitions[0].definition}
            </p>
            <i class="results-example">
            ${iterator.definitions[0].example ? ' Example: '+ iterator.definitions[0].example  : ""}
            </i>`
        }
        results.innerHTML += ` <div class="dictionary-audio">
        <audio src="${dataEl.phonetics[0].audio}" controls></audio>
          </div>`;
        
    })}



