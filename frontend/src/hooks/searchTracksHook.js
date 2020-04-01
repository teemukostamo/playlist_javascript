import { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import searchService from '../services/search';

export const useSearchTracksHook = () => {
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchTrack = useConstant(() =>
    AwesomeDebouncePromise(searchService.getTracksForSearch, 400)
  );
  const search = useAsync(
    async () => {
      if (inputText.length === 0) {
        return [];
      } else {
        return debouncedSearchTrack(inputText);
      }
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [inputText]
  );
  return {
    inputText,
    setInputText,
    search
  };
};
