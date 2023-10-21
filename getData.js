/*
fetch('https://one00x-data-analysis.onrender.com/assignment?email=sidhantdorge@gmail.com',
    {
        method : 'GET',
        headers:{
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    */

    const URL = 'https://one00x-data-analysis.onrender.com/assignment?email=sidhantdorge@gmail.com';

    async function fetchData() {
        const response = await fetch(URL);
        //console.log(response);
        const data = await response.json();
        console.log(data);


        //const words = data.split("\n");

        //To store word frequencies:
        const wordFrequency = {};

        //Counting word frequencies:
        data.forEach(word => {
            word = word.trim().toLowerCase();
            if(word){
                wordFrequency[word] = (wordFrequency[word] || 0 ) + 1;
            }
        });

        //Checking word with highest Frequency
        let mostUsedWord = null;
        let highestFrequency = 0;

        for (const word in wordFrequency){
            if(wordFrequency[word] > highestFrequency){
                highestFrequency = wordFrequency[word];
                mostUsedWord = word;
            }
        }
        
        console.log(`The most used word is: ${mostUsedWord}`);
        //return mostUsedWord;

        //Posting Data:
        async function postMostUsedWord(xassignmentid,mostUsedWord) {
            try{
                const postData = {
                    xassignmentid: xassignmentid,
                    mostUsedWord : mostUsedWord
                };

                const postResponse = await fetch(URL,{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

                if(postResponse.ok){
                    console.log("Success");
                }
                else{
                    console.log("Failed");
                }


            }
            catch(error){
                console.log("Something went wrong: ",error);
            }
        }

        const xassignmentid = "28dd01be-0050-468b-874b-a5f682ee2bfb";
        await postMostUsedWord(xassignmentid,mostUsedWord);



    }



    fetchData();
    console.log("END");
