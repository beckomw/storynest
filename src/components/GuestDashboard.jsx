import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorynest } from '../context/StorynestContext';
import Navbar from './Navbar';
import { FaBook, FaHeart, FaComment, FaUsers } from 'react-icons/fa';

// Sample data for the guest preview
const sampleStats = {
  totalStories: 42,
  totalLikes: 256,
  totalComments: 128,
  activeUsers: 15
};

const sampleStories = [
  {
    id: 1,
    title: "The Adventure Begins",
    author: "storyteller",
    preview: "In a land far away, where dragons soared through crimson skies...",
    likes: 45,
    comments: 12,
    created_at: "2 hours ago"
  },
  {
    id: 2,
    title: "Midnight Mystery",
    author: "nightwriter",
    preview: "The clock struck twelve when Sarah first noticed the shadow...",
    likes: 32,
    comments: 8,
    created_at: "5 hours ago"
  },
  {
    id: 3,
    title: "Code & Coffee",
    author: "devdreamer",
    preview: "Every morning started the same way - terminal open, coffee brewing...",
    likes: 28,
    comments: 15,
    created_at: "1 day ago"
  }
];

const sampleActivity = [
  { action: "New story published", user: "storyteller", time: "10 min ago" },
  { action: "Comment added", user: "reader42", time: "25 min ago" },
  { action: "Story liked", user: "bookworm", time: "1 hour ago" },
  { action: "New user joined", user: "newwriter", time: "2 hours ago" }
];

function GuestDashboard() {
  const { isGuest, loginWithRedirect } = useStorynest();
  const navigate = useNavigate();

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Navbar />

      {/* Preview Banner */}
      <div style={{
        backgroundColor: '#fef3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '15px 20px',
        margin: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong>Preview Mode</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#856404' }}>
            You're viewing a preview of the dashboard with sample data. Sign in to access your personalized dashboard.
          </p>
        </div>
        <button
          onClick={() => loginWithRedirect()}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}>
        <StatCard icon={<FaBook />} title="Total Stories" value={sampleStats.totalStories} color="#007bff" />
        <StatCard icon={<FaHeart />} title="Total Likes" value={sampleStats.totalLikes} color="#dc3545" />
        <StatCard icon={<FaComment />} title="Total Comments" value={sampleStats.totalComments} color="#28a745" />
        <StatCard icon={<FaUsers />} title="Active Users" value={sampleStats.activeUsers} color="#6f42c1" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        padding: '0 20px 20px 20px',
      }}>
        {/* Recent Stories */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Recent Stories</h2>
          {sampleStories.map(story => (
            <div key={story.id} style={{
              borderBottom: '1px solid #eee',
              padding: '15px 0',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{story.title}</h3>
                  <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#666' }}>
                    by {story.author} - {story.created_at}
                  </p>
                  <p style={{ margin: '0', color: '#555', fontSize: '14px' }}>{story.preview}</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#888' }}>
                  <span><FaHeart style={{ color: '#dc3545' }} /> {story.likes}</span>
                  <span><FaComment style={{ color: '#007bff' }} /> {story.comments}</span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => navigate('/stories')}
            style={{
              marginTop: '15px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            View All Stories
          </button>
        </div>

        {/* Activity Feed */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Recent Activity</h2>
          {sampleActivity.map((activity, index) => (
            <div key={index} style={{
              padding: '10px 0',
              borderBottom: index < sampleActivity.length - 1 ? '1px solid #eee' : 'none',
            }}>
              <p style={{ margin: '0', fontSize: '14px', color: '#333' }}>
                <strong>{activity.user}</strong>
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#666' }}>
                {activity.action}
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#999' }}>
                {activity.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Preview */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        margin: '0 20px 20px 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>What You Can Do With StoryNest</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <FeatureCard
            title="Write & Share Stories"
            description="Create your own stories and share them with the community."
          />
          <FeatureCard
            title="Engage with Content"
            description="Like, comment, and interact with stories from other writers."
          />
          <FeatureCard
            title="Build Your Profile"
            description="Track your published stories and build your reader following."
          />
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      <div style={{
        backgroundColor: `${color}20`,
        color: color,
        padding: '15px',
        borderRadius: '10px',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{title}</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{value}</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '15px',
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>{title}</h3>
      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{description}</p>
    </div>
  );
}

export default GuestDashboard;
