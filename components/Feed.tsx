"use client";

import { FC, useState, useEffect, ChangeEvent } from 'react';
import PromptCard from './PromptCard';

interface FeedProps {};
interface PromptCardListProps {
  data: any[];
  handleTagClick: (arg0: string) => void;
};

const PromptCardList: FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed: FC<FeedProps> = ({}) => {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  // Search states
  const [searchText, setSearchText] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<null | NodeJS.Timeout>(null);
  const [searchedResults, setSearchedResults] = useState<any[]>([]);

  const fetchPosts = async (): Promise<void> => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // condition to clearTime out ONLY not null!
    searchTimeout && clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string): void => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  // Fetch the post as the page load
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;