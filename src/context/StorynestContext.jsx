import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const StorynestContext = createContext();

// Demo user for the application
const DEMO_USER = {
  name: 'Demo User',
  username: 'demo_user',
  email: 'demo@storynest.app'
};

// Sample stories for demo
const DEMO_STORIES = [
  {
    id: 1,
    title: "Post-Mortem: Search P99 hit 800ms on Black Friday",
    content: "Undersized heap (8GB) + 3x traffic = G1GC couldn't keep up. Bumped to 16GB, tuned region size. P99 back to 112ms. Added GC alerting so we catch this earlier next time.",
    author: "mchen",
    likes_count: 127,
    dislikes_count: 3,
    comments_count: 34,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Graviton3 benchmarks are in",
    content: "6 weeks of testing c7g vs c6i: 23% better price/perf, 15% lower P99 on CPU-bound services. ARM64 images 18% smaller. Some ML deps still need x86 but we can use mixed node pools. Recommending we migrate all JVM services.",
    author: "priya",
    likes_count: 89,
    dislikes_count: 2,
    comments_count: 28,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "Cut pod startup from 45s to 18s",
    content: "Three changes: JVM class data sharing (-8s), Spring lazy init (-12s), tuned probe timing (-7s). PR #4521 adds CDS to our base image. Should help with scale-up latency during traffic spikes.",
    author: "alex",
    likes_count: 156,
    dislikes_count: 1,
    comments_count: 42,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    title: "Found the CPU regression in messaging-service",
    content: "Someone put Pattern.compile() in a hot loop. Classic. Flame graph showed 22% of CPU in regex matching. Pre-compiled the pattern, moved validation upstream. CPU back to normal. We should add perf regression tests to CI.",
    author: "sarah",
    likes_count: 203,
    dislikes_count: 0,
    comments_count: 51,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    title: "Homepage load test: green with caveats",
    content: "10K RPS for 2 hours. P99 improved 8%, errors down 50%, but CPU up 38%. The new personalization module is expensive. Adding Redis cache for model outputs before we ship. Should bring CPU back in line.",
    author: "david",
    likes_count: 78,
    dislikes_count: 4,
    comments_count: 19,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    title: "THP was causing our latency spikes",
    content: "2 days chasing random 200-500ms stalls after the kernel upgrade. No correlation with GC. Turned out to be transparent hugepage compaction. Set THP to madvise, added to AMI. Also wired up perf counters so we see this faster next time.",
    author: "jun",
    likes_count: 234,
    dislikes_count: 2,
    comments_count: 67,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 7,
    title: "Spot instances saving us $2.3M/year",
    content: "Moved batch workloads to spot with Karpenter. 73% of compute now spot, 4% interruption rate, <1% job failures thanks to checkpointing. Config in terraform-infra/modules/karpenter-spot if anyone wants to do the same.",
    author: "rachel",
    likes_count: 312,
    dislikes_count: 5,
    comments_count: 89,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 8,
    title: "ZGC results: worth it for booking path",
    content: "Ran ZGC vs G1 on reservation-service for 2 weeks. P99 dropped from 89ms to 34ms, P99.9 from 245ms to 41ms. Uses 15% more memory but the tail latency improvement is worth it. Rolling out to all latency-sensitive services.",
    author: "kevin",
    likes_count: 178,
    dislikes_count: 3,
    comments_count: 45,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Sample comments for demo
const DEMO_COMMENTS = {
  1: [
    { id: 101, author: "lisa", content: "Same thing hit payments last month. Also try -XX:+UseNUMA if you're on multi-socket.", likes_count: 18, dislikes_count: 0, story_id: 1, created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: 102, author: "tom", content: "Can you share the Datadog dashboard?", likes_count: 8, dislikes_count: 0, story_id: 1, created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString() }
  ],
  2: [
    { id: 201, author: "nina", content: "Any workarounds for Spark? Native libs keeping us on x86.", likes_count: 12, dislikes_count: 0, story_id: 2, created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() }
  ],
  3: [
    { id: 301, author: "marco", content: "CDS is great. Got inventory-service down to 22s. Adding to base image.", likes_count: 24, dislikes_count: 0, story_id: 3, created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
    { id: 302, author: "amy", content: "Looked at GraalVM native-image? Sub-100ms startup but builds are slow.", likes_count: 9, dislikes_count: 0, story_id: 3, created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() }
  ],
  4: [
    { id: 401, author: "james", content: "Missed this in review - it was buried in a util class. +1 on perf regression tests.", likes_count: 31, dislikes_count: 0, story_id: 4, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  5: [
    { id: 501, author: "chris", content: "Model supports batching up to 32. Might help more than caching for burst traffic.", likes_count: 14, dislikes_count: 0, story_id: 5, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  6: [
    { id: 601, author: "pat", content: "Also set vm.compaction_proactiveness=0. Adding to AMI checklist.", likes_count: 27, dislikes_count: 0, story_id: 6, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 602, author: "mchen", content: "This got us last quarter too. Good call on the perf counters.", likes_count: 15, dislikes_count: 0, story_id: 6, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  7: [
    { id: 701, author: "omar", content: "How do you handle interrupts on multi-hour Spark jobs?", likes_count: 22, dislikes_count: 0, story_id: 7, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  8: [
    { id: 801, author: "priya", content: "Watch out for NUMA topology with ZGC. Pin to single socket or use -XX:+UseNUMAInterleaving.", likes_count: 19, dislikes_count: 0, story_id: 8, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 802, author: "alex", content: "Using ZGenerational? Had issues on 21.0.1, fixed in 21.0.2.", likes_count: 11, dislikes_count: 0, story_id: 8, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() }
  ]
};

// eslint-disable-next-line react/prop-types
export const StorynestProvider = ({ children }) => {
  const [name, setName] = useState(DEMO_USER.name);
  const [username, setUsername] = useState(DEMO_USER.username);
  const [stories, setStories] = useState(DEMO_STORIES);
  const [story, setStory] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allComments, setAllComments] = useState(DEMO_COMMENTS);

  // Demo user is always "authenticated"
  const isAuthenticated = true;
  const isGuest = false;
  const user = DEMO_USER;
  const token = 'demo-token';

  // Get comments for a specific story
  const getStoryComments = (storyId) => {
    return allComments[storyId] || [];
  };

  // Add a comment to a story
  const addComment = (storyId, commentData) => {
    const newComment = {
      id: Date.now(),
      ...commentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setAllComments(prev => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), newComment]
    }));
    // Update comment count on story
    setStories(prev => prev.map(s =>
      s.id === parseInt(storyId)
        ? { ...s, comments_count: s.comments_count + 1 }
        : s
    ));
    return newComment;
  };

  // Add a new story
  const addStory = (storyData) => {
    const newStory = {
      id: Date.now(),
      ...storyData,
      author: username,
      likes_count: 0,
      dislikes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString()
    };
    setStories(prev => [newStory, ...prev]);
    return newStory;
  };

  // Placeholder functions for compatibility
  const logout = () => {};
  const loginWithRedirect = () => {};
  const loginAsGuest = () => {};

  return (
    <StorynestContext.Provider
      value={{
        logout,
        loginWithRedirect,
        loginAsGuest,
        name,
        isAuthenticated,
        isGuest,
        user,
        stories,
        setStories,
        token,
        story,
        setStory,
        comments,
        setComments,
        username,
        setUsername,
        isLoading,
        setIsLoading,
        getStoryComments,
        addComment,
        addStory,
        allComments
      }}
    >
      {children}
    </StorynestContext.Provider>
  );
};

export const useStorynest = () => {
  const context = useContext(StorynestContext);
  if (!context) {
    throw new Error("useStorynest must be used within a StorynestProvider");
  }
  return context;
};
