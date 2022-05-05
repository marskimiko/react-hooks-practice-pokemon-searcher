import React, {useState} from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({ onAddPokemon }) {

  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    frontUrl: "",
    backUrl: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit() {
    const newPokemon = {
      name: formData.name,
      hp: formData.hp,
      sprites: {
        front: formData.frontUrl,
        back: formData.backUrl
      },
    };

    fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemon),
    })
    .then(response => response())
    .then(onAddPokemon);
  }


  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input 
            onChange={handleChange} 
            fluid label="Name" 
            placeholder="Name" 
            name="name" 
            value={formData.name} 
          />
          <Form.Input 
            onChange={handleChange} 
            fluid label="hp" 
            placeholder="hp" 
            name="hp" 
            value={formData.hp}  
          />
          <Form.Input
            onChange={handleChange} 
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            value={formData.frontUrl}
          />
          <Form.Input
            onChange={handleChange}
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            value={formData.backUrl}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
