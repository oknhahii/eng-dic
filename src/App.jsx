import React, { useState, useEffect } from 'react';
import './App.css';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';

const startDay = new Date("2023-11-04");

function App() {
  const [newWord, setNewWord] = useState('');
  const [newPronunciation, setNewPronunciation] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [status, setStatus] = useState('add');
  const [updatedId, setUpdatedId] = useState(0);
  const [numNewWords, setnumNewWords] = useState([]);
  

  const [words, setWords] = useState([
    { id:1, word: 'Apple', pronunciation: 'ˈæpl', meaning: 'Quả táo' },
    { id:2, word: 'Book', pronunciation: 'bʊk', meaning: 'Cuốn sách' },
    { id:3, word: 'Car', pronunciation: 'kɑːr', meaning: 'Xe hơi' },
    { id:4, word: 'Dog', pronunciation: 'dɔːɡ', meaning: 'Con chó' },
    { id:5, word: 'Elephant', pronunciation: 'ˈel.ə.fənt', meaning: 'Con voi' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdate = (id) => {
      let newWords = words.map((word, index)=>(
        word.id == id
        ?
          {
            id: id, 
            word: newWord, 
            pronunciation: newPronunciation,
            meaning: newMeaning 
          }
        : 
          word
      ))
      localStorage.setItem('words', JSON.stringify(newWords));

      setWords(newWords)

      setNewMeaning('')
      setNewPronunciation('')
      setNewWord('') 
      setUpdatedId('')

      setStatus('add')
  }

  const handleEdit = (word) => {
    setNewMeaning(word.meaning)
    setNewPronunciation(word.pronunciation)
    setNewWord(word.word) 
    setUpdatedId(word.id)
    setStatus('update')
  }

  const handleAddWord = () => {
    if (newWord && newMeaning && newPronunciation) {
      const newWordObject = {
        word: newWord,
        pronunciation: newPronunciation,
        meaning: newMeaning
      };

      let now = new Date();
      let day = Math.ceil((now.getTime() - startDay.getTime())/86400000);
      console.log(day)

      if(numNewWords[day]){
        numNewWords[day] += 1;
      }else{
        numNewWords[day] = 1
      }

      localStorage.setItem('numNewWords', JSON.stringify(numNewWords))

      localStorage.setItem('words', JSON.stringify([...words, newWordObject]));
      setWords([...words, newWordObject]);
      setNewWord('');
      setNewMeaning('');
      setNewPronunciation('');

    } else {
      alert('Please fill in all fields!');
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredWords = words.filter(word => {
    return (
      word?.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      word?.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word?.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });

  useEffect(()=>{
      let data = localStorage.getItem('words');
      data = JSON.parse(data);

      let numWords = localStorage.getItem('numNewWords');
      numWords = JSON.parse(numWords);

      if (data && data.length > 0) {
        setWords(data)
      }

      if (numWords && numWords.length > 0) {
        setnumNewWords(numWords)
      }

  },[])


  return (
    <main>
      <div className="container">
        <h1>Let learn english now!</h1>
        <input type="text" placeholder="Search for a word..." value={searchTerm} onChange={handleSearch} />
        <div id='add-block'>
          <h2 >{status === 'add' ? 'Add a new Word' : 'Edit a word'}</h2> 
          <label htmlFor="newWordInput">Word:</label>
          <input type="text" id="newWordInput" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
          <label htmlFor="newPronunciationInput">Pronunciation:</label>
          <input type="text" id="newPronunciationInput" value={newPronunciation} onChange={(e) => setNewPronunciation(e.target.value)} />
          <label htmlFor="newMeaningInput">Meaning:</label>
          <input type="text" id="newMeaningInput" value={newMeaning} onChange={(e) => setNewMeaning(e.target.value)} />
          <button id="addWordBtn" onClick={()=>{status === 'add'? handleAddWord() : handleUpdate(updatedId)}}>{status === 'add' ? 'Add word':'Update word'}</button>
        </div>
        <div id='word-list'>
          <h2>Words:</h2>
          <ul className='ul-list'>
            {filteredWords.map((word, index) => (
              <li className='word-item' key={index}>
                  <div className='content'>{word.word} /{word.pronunciation}/ - {word.meaning}</div>
                  <button className='edit-btn' onClick={()=>{handleEdit(word)}}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    <Link id='contest-btn' to='/contest'>
        <Fab variant="extended" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
             quiz 
        </Fab>
    </Link>    
    <Link id='statistic-btn' to='/chart'>
        <Fab variant="extended" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
             Chart
        </Fab>
    </Link>     
   </main>
   
	);
}

export default App;