import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act, useState } from "react";

let apiKey = "c43326b951fe4c0082d43d473a810aa6";

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async (inputValue) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=${apiKey}`
    );
    const data = await res.json();
    return data;
  }
);

const newsSlice = createSlice({
  initialState: {
        articles: [
          {
            source: {
                id: null,
                name: "BBC News"
            },
            author: "Andy West",
            title: "Bellingham inspires 'complete team' Real to La Liga title",
            description:
              "Real Madrid are La Liga champions and BBC Sport examines the story of their success this season.",
            url: "https://www.bbc.com/sport/football/articles/cw8q962np83o",
            urlToImage:
              "https://ichef.bbci.co.uk/news/1024/branded_sport/655e/live/1b2be7a0-095f-11ef-82e8-cd354766a224.jpg",
            publishedAt: "2024-05-05T06:59:22Z",
            content:
              "Between the prolific forward line and the successfully patched-up defence, everything has been knitted together by arguably the best midfield in football in terms of both quality and quantity.\r\nAt th… [+1711 chars]",
          },

          {
            "source": {
              "id": null,
              "name": "BBC News"
            },
            "author": "Emma Sanders",
            "title": "Bright says Hayes' support 'massive' and admits career doubts",
            "description": "In Mental Health Awareness Week, Chelsea captain Millie Bright offers advice and tells BBC Sport about her own battles this season.",
            "url": "https://www.bbc.com/sport/football/articles/c4n1yrx00dmo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/d660/live/a5ae19b0-1149-11ef-b9d8-4f52aebe147d.jpg",
            "publishedAt": "2024-05-14T05:59:51Z",
            "content": "Millie Bright went from leading England in a World Cup final to missing over five months of the Women's Super League season with a knee injury. \r\nBright says it \"hurts\" she has missed most of manager… [+1968 chars]"
          },

          {
            "source": {
              "id": "bbc-news",
              "name": "BBC News"
            },
            "author": "https://www.facebook.com/bbcnews",
            "title": "Barron Trump 'declines' Republican convention role",
            "description": "The former US president's youngest child, 18, has \"prior commitments\", according to his mother.",
            "url": "https://www.bbc.co.uk/news/world-us-canada-68992293",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/F153/production/_133297716_gettyimages-1410059415.jpg",
            "publishedAt": "2024-05-10T21:55:10Z",
            "content": "Barron Trump is declining to serve as a delegate on behalf of his father at the Republican National Convention, according to his mother's office.\r\nThe Florida Republican Party announced on Wednesday … [+3209 chars]"
          },
          {
            "source": {
              "id": "wired",
              "name": "Wired"
            },
            "author": "William Turton",
            "title": "The US Election Threats Are Clear. What to Do About Them Is Anything But",
            "description": "A Senate Intelligence Committee hearing today saw broad agreement on how AI and other threats loom ahead of the US election—and uncertainty about how to respond.",
            "url": "https://www.wired.com/story/election-threats-senate-hearing-ai-disinformation-deepfakes/",
            "urlToImage": "https://media.wired.com/photos/664509c1c970d788e4ff6968/191:100/w_1280,c_limit/Senate-Intelligence-Hearing-Election-Threats-Politics.jpg",
            "publishedAt": "2024-05-15T23:05:47Z",
            "content": "On Wednesday, members of the US Senate Intelligence Committee questioned senior national security officials on how they plan to respond to attacks on voting infrastructure and attempts to influence t… [+3152 chars]"
          },
          {
            "source": {
              "id": "wired",
              "name": "Wired"
            },
            "author": "Justin Ling",
            "title": "Inside Ukraine’s Killer-Drone Startup Industry",
            "description": "Ukraine needs small drones to combat Russian forces—and is bootstrapping its own industry at home.",
            "url": "https://www.wired.com/story/ukraine-drone-startups-russia/",
            "urlToImage": "https://media.wired.com/photos/663257f63fa2e256335506c8/191:100/w_1280,c_limit/WI-0524-01-Ukraine-3D-Printed-Drones-4.jpg",
            "publishedAt": "2024-05-02T06:00:00Z",
            "content": "The effort to bring the war to Russia is advancing on multiple fronts. One of the most famous uncrewed systems of the war has been Kyivs Sea Baby drones. Videos have gone viral of these sleek ships c… [+3074 chars]"
          },

          {
            "source": {
              "id": "wired",
              "name": "Wired"
            },
            "author": "Joel Khalili",
            "title": "Craig Wright Lied About Creating Bitcoin And Faked Evidence, Judge Rules",
            "description": "A UK judge has determined that Craig Wright forged evidence in a campaign to prove he is Satoshi Nakamoto, creator of Bitcoin, in a move that prevents him from bringing further lawsuits in the country.",
            "url": "https://www.wired.com/story/craig-wright-lied-faked-evidence-bitcoin-judge-says/",
            "urlToImage": "https://media.wired.com/photos/663964ab2a04ee031b4d1808/191:100/w_1280,c_limit/Craig-Wright-Sentencing-Business-2024583568.jpg",
            "publishedAt": "2024-05-20T11:01:15Z",
            "content": "Weve seen a cascading effect from the pronouncement on a host of other litigations globally, says Grewal. For people outside of crypto, [all this] might sound cartoonish. But with Wrights claims fall… [+3320 chars]"
          },
        ],
    savedArticles: [],
    notClickedSavedArticles: true,
    isLoading: null,
    error: false,
    searchError: false,
  },
  name: "news",
  reducers: {
    addToRead: (state, action) => {
      let indexOfElement = state.savedArticles.findIndex(
        (item) => item.publishedAt === action.payload.publishedAt
      );
      console.log(indexOfElement);
      if (indexOfElement < 0) {
        return {
          ...state,
          savedArticles: [...state.savedArticles, action.payload],
        };
      } else {
        return { ...state, savedArticles: [...state.savedArticles] };
      }
    },

    deleteFromRead: (state, action) => {
      let indexOfElement = state.savedArticles.findIndex(
        (item) => item.publishedAt === action.payload.publishedAt
      );
      return {
        ...state,
        savedArticles: [...state.savedArticles.toSpliced(indexOfElement, 1)],
      };
    },

    notClickedChange: (state) => {
      return {
        ...state,
        notClickedSavedArticles: !state.notClickedSavedArticles,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchContent.fulfilled, (state, action) => {
      if (action.payload.status === "ok") {
        state.articles   = action.payload.articles;
        state.searchError = false;
      } else {
        state.searchError = true;
      }
      state.isLoading = false;
    });

    builder.addCase(fetchContent.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { addToRead } = newsSlice.actions;
export const { deleteFromRead } = newsSlice.actions;
export const { notClickedChange } = newsSlice.actions;

export default newsSlice.reducer;
