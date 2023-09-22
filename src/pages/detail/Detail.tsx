import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineColumnHeight } from 'react-icons/ai';

interface Type {
  name: string;
  url: string;
}

interface PokemonType {
  abilities: any[];
  name: string;
  height: number;
  weight: number;
  types: Type[];
}

const Detail = () => {
  const [character, setCharacter] = useState<PokemonType | null>(null);
  const [isLoading, setLoading] = useState(true);

  console.log(character);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/mew/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DetailContainer>
          <Title>{character?.name}</Title>
          <SubContents>
            <h3>특성</h3>
            {character?.abilities.map(({ ability }, index) => <p key={index}>{ability.name}</p>)}
          </SubContents>
          <SubContents>
            <h3>
              <AiOutlineColumnHeight />키
            </h3>
            <p>{character?.height && `${character.height / 10}m`}</p>
          </SubContents>
          <SubContents>
            <h3>
              <AiOutlineColumnHeight />
              몸무게
            </h3>
            <p>{character?.weight && `${(character.weight / 10).toFixed(1)}kg`}</p>
          </SubContents>
        </DetailContainer>
      )}
    </>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  h3 {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 1rem;

    border-right: 1px solid #cccccc;
  }

  p {
    min-width: 200px;
    flex-grow: 1;
    font-size: 14px;
  }
`;

export default Detail;
