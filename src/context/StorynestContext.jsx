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
    title: "[Post-Mortem] Search API P99 Latency Spike - Nov 2024",
    content: "TL;DR: G1GC promotion failures caused 800ms+ P99 latencies during peak traffic.\n\nRoot Cause: Our search-ranking service was configured with -XX:MaxGCPauseMillis=200 but heap was undersized at 8GB. During Black Friday traffic (3x normal), the young gen couldn't keep up with allocation rate, triggering frequent full GCs.\n\nFix: Increased heap to 16GB, tuned -XX:G1HeapRegionSize=16m, and added -XX:+UseStringDeduplication. P99 dropped from 847ms to 112ms.\n\nAction Items:\n- Added GC pause alerting to Datadog\n- Created runbook for JVM tuning under load\n- Scheduled capacity review for all tier-1 services",
    author: "mchen_infra",
    likes_count: 127,
    dislikes_count: 3,
    comments_count: 34,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "RFC: Migrating to Graviton3 instances - Performance Analysis",
    content: "After 6 weeks of benchmarking, here's what we found migrating from c6i.4xlarge to c7g.4xlarge:\n\nWins:\n- 23% better price/performance on stateless API services\n- 15% reduction in P99 latency for CPU-bound workloads\n- Native ARM64 builds reduced image size by ~18%\n\nChallenges:\n- JNI dependencies in legacy payment service need recompilation\n- async-profiler required patches for ARM64 flamegraphs\n- Some Python ML deps still x86-only (workaround: mixed node pools)\n\nRecommendation: Proceed with migration for all JVM services. ETA 6-8 weeks for full rollout. See attached Grafana dashboard for detailed metrics.",
    author: "priya_perf",
    likes_count: 89,
    dislikes_count: 2,
    comments_count: 28,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "Deep Dive: How we cut K8s pod startup time by 60%",
    content: "Our booking service was taking 45s to become ready. Here's how we got it to 18s:\n\n1. JVM CDS (Class Data Sharing)\n   - Generated shared archive during build\n   - Added -XX:SharedArchiveFile to entrypoint\n   - Saved ~8s on class loading\n\n2. Spring lazy initialization\n   - spring.main.lazy-initialization=true for non-critical beans\n   - Explicit @Lazy on heavy dependencies\n   - Saved ~12s\n\n3. Probes tuning\n   - Switched liveness from HTTP to exec\n   - Reduced initialDelaySeconds from 30 to 10\n   - Saved ~7s perceived time\n\nPR: #4521 | Dashboard: grafana.internal/d/pod-startup",
    author: "alex_k8s",
    likes_count: 156,
    dislikes_count: 1,
    comments_count: 42,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    title: "Flame Graph Analysis: Messaging Service CPU Regression",
    content: "After last week's deploy, messaging-service CPU jumped 34%. Used async-profiler to dig in.\n\nFindings:\n```\n40.2% - com.fasterxml.jackson.databind.ser.std.StringSerializer\n22.1% - java.util.regex.Pattern.matcher (!!)\n18.4% - io.netty.buffer.PooledByteBufAllocator\n```\n\nThe regex was new - someone added email validation in the hot path using Pattern.compile() inside the loop. Classic mistake.\n\nFix: Pre-compiled pattern + moved validation to API gateway. CPU back to baseline.\n\nLesson: We need to add CPU regression tests to CI. Created JIRA-4892 to track.",
    author: "sarah_perf",
    likes_count: 203,
    dislikes_count: 0,
    comments_count: 51,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    title: "Load Test Results: Homepage Redesign (Q4 Release)",
    content: "Ran production load tests for the new homepage. 10K RPS sustained for 2 hours.\n\nResults Summary:\n| Metric | Baseline | New | Delta |\n|--------|----------|-----|-------|\n| P50    | 45ms     | 52ms| +15%  |\n| P99    | 180ms    | 165ms| -8%  |\n| Error Rate | 0.02% | 0.01% | -50% |\n| Pod CPU | 45% | 62% | +38% |\n\nConcern: CPU increase is significant. Root cause is the new personalization module doing ML inference on each request. Recommendation: Add Redis cache for model outputs (TTL 5min). Working with ML team on implementation.\n\nGreen light with caching fix. Load test artifacts in S3://perf-tests/homepage-q4/",
    author: "david_sre",
    likes_count: 78,
    dislikes_count: 4,
    comments_count: 19,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    title: "TIL: Linux kernel 6.1 transparent hugepages broke our JVM",
    content: "Spent 2 days debugging random latency spikes after OS upgrade. Turned out to be THP compaction stalls.\n\nSymptoms:\n- Random 200-500ms stalls\n- No correlation with GC logs\n- Only on upgraded hosts\n\nDiagnosis:\n```bash\nperf record -g -p <pid>\n# showed khugepaged and compact_zone taking forever\n```\n\nFix:\n```bash\necho madvise > /sys/kernel/mm/transparent_hugepage/enabled\necho madvise > /sys/kernel/mm/transparent_hugepage/defrag\n```\n\nAdded to our AMI build. Also added perf counters for THP to our node_exporter config so we catch this faster next time.\n\nRelated: https://bugs.openjdk.org/browse/JDK-8256155",
    author: "jun_linux",
    likes_count: 234,
    dislikes_count: 2,
    comments_count: 67,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 7,
    title: "Cost Optimization: $2.3M/year saved with spot instances",
    content: "Finally got approval to share our spot instance strategy for batch workloads.\n\nWhat we did:\n1. Identified interruptible workloads (ETL, ML training, integration tests)\n2. Built Karpenter provisioner with spot + fallback to on-demand\n3. Added checkpointing to long-running jobs\n4. Diversified across 12 instance types for capacity\n\nResults (6 month avg):\n- Batch compute: 73% on spot (was 0%)\n- Interruption rate: 4.2%\n- Jobs affected: 0.8% (checkpointing works)\n- Annual savings: $2.3M\n\nConfig in terraform-infra/modules/karpenter-spot/. Happy to do a walkthrough for other teams.",
    author: "rachel_finops",
    likes_count: 312,
    dislikes_count: 5,
    comments_count: 89,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 8,
    title: "ZGC vs G1GC: Real-world comparison on reservation-service",
    content: "Ran ZGC in shadow mode for 2 weeks. Here's the data:\n\nSetup: reservation-service, 32GB heap, ~2K RPS\n\nLatency (ms):\n| Percentile | G1GC | ZGC |\n|------------|------|-----|\n| P50 | 12 | 11 |\n| P99 | 89 | 34 |\n| P99.9 | 245 | 41 |\n| Max | 1,847 | 156 |\n\nThroughput: G1 slightly better (2% more RPS at same CPU)\n\nMemory overhead: ZGC uses ~15% more RSS\n\nVerdict: ZGC wins for latency-sensitive services. The P99.9 improvement alone justifies the memory overhead. Rolling out to all booking-path services.\n\nFlags used:\n```\n-XX:+UseZGC -XX:+ZGenerational -Xmx32g -Xms32g\n```",
    author: "kevin_jvm",
    likes_count: 178,
    dislikes_count: 3,
    comments_count: 45,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Sample comments for demo
const DEMO_COMMENTS = {
  1: [
    { id: 101, author: "lisa_sre", content: "We hit the same issue on payments-service. One thing that helped us was adding -XX:+UseNUMA on our multi-socket hosts. Worth checking if you haven't already.", likes_count: 18, dislikes_count: 0, story_id: 1, created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: 102, author: "tom_platform", content: "Thanks for the detailed writeup. Added link to our internal wiki. Can we get the Datadog dashboard ID for the GC alerting?", likes_count: 8, dislikes_count: 0, story_id: 1, created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString() }
  ],
  2: [
    { id: 201, author: "nina_data", content: "Our Spark jobs are still x86-only due to some native libs. Any workarounds besides mixed node pools? We're burning money on c6i instances.", likes_count: 12, dislikes_count: 0, story_id: 2, created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() }
  ],
  3: [
    { id: 301, author: "marco_backend", content: "The CDS tip is gold. Just tried it on inventory-service and cut startup from 38s to 22s. PR incoming to add this to our base Docker image.", likes_count: 24, dislikes_count: 0, story_id: 3, created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
    { id: 302, author: "amy_devex", content: "Have you looked at GraalVM native-image? We're evaluating it for our CLI tools. Startup is sub-100ms but build times are painful.", likes_count: 9, dislikes_count: 0, story_id: 3, created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() }
  ],
  4: [
    { id: 401, author: "james_oncall", content: "I reviewed that PR - the regex wasn't in the original code review because it was buried in a utility class. +1 on CPU regression tests in CI. We could use continuous profiling to catch these automatically.", likes_count: 31, dislikes_count: 0, story_id: 4, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  5: [
    { id: 501, author: "chris_ml", content: "Redis cache makes sense. We could also look at batching inference calls - the model supports batch sizes up to 32. Might help with the CPU spike during burst traffic.", likes_count: 14, dislikes_count: 0, story_id: 5, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  6: [
    { id: 601, author: "pat_kernel", content: "Good catch. We should probably also set vm.compaction_proactiveness=0 to prevent background compaction. Adding to the AMI hardening checklist.", likes_count: 27, dislikes_count: 0, story_id: 6, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 602, author: "mchen_infra", content: "This bit us too last quarter. Wrote it up in the kernel upgrade runbook but clearly we need better visibility. Nice work on the perf counters.", likes_count: 15, dislikes_count: 0, story_id: 6, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  7: [
    { id: 701, author: "omar_data", content: "Would love that walkthrough! Our nightly ETL jobs would be perfect for this. What's your interruption handling strategy for multi-hour Spark jobs?", likes_count: 22, dislikes_count: 0, story_id: 7, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  8: [
    { id: 801, author: "priya_perf", content: "Great data. One thing to watch with ZGC - it's more sensitive to NUMA topology. Make sure you're pinning to a single socket or using -XX:+UseNUMAInterleaving.", likes_count: 19, dislikes_count: 0, story_id: 8, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 802, author: "alex_k8s", content: "Are you using ZGenerational? We saw some instability with it in JDK 21.0.1 but 21.0.2 fixed most issues.", likes_count: 11, dislikes_count: 0, story_id: 8, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() }
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
