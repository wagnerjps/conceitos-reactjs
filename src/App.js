import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  //const [success, setSuccess] = useState(false)

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault()

    const response = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`, 
      url: `https://github.com/wagnerjps/${Date.now()}`, 
      techs: ['aaaa', 'bbbb', 'cccc']
    })

    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(e, id) {
    e.preventDefault()

    await api.delete(`/repositories/${id}`)

    const repositoriesUpdated = repositories.filter(repo => repo.id !== id)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories])

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => {
        return(
          <li key={repository.id}>{repository.title}
            <button onClick={(e) => handleRemoveRepository(e, repository.id)}>Remover</button>
          </li>
        )}
      )}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
