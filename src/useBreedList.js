import React, { useEffect, useState } from 'react'

const localCache = []

const Breed = (animal) => {
  const [breedList, setBreedList] = useState([])
  const [status, setStatus] = useState('unloaded')

  useEffect(() => {
    if (!animal) {
      setBreedList([])
    } else if (localCache[animal]) {
      setBreedList(localCache[animal])
    } else {
      requestBreedList()
    }

    const requestBreedList = async () => {
        setBreedList([])
        setStatus('loading')
    
        const res = await fetch(
          `http://pets-v3.dev-apis.com/breeds?animal=${animal}`
        )
        const json = await res.json()
        localCache[animal] = json.breeds || []
        setBreedList(localCache[animal])
        setStatus('loaded')
    
      }
  }, [animal])
  return [breedList, status]

}


 

export default Breed
