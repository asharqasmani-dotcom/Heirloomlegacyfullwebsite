import React from 'react';
import { insightsArticles } from '../data/insights';
import { ArrowUpRight, Building2, Folder } from 'lucide-react';
import './Insights.css';

export const Insights: React.FC = () => {
  return (
    <section className="insights-section section-light" id="insights" aria-label="Living and lifestyle insights">
      <div className="container">
        {/* Section Header */}
        <div className="insights-header">
          <div className="header-left">
            <span className="eyebrow eyebrow-light">Living &amp; Lifestyle Insights</span>
            <h2 className="insights-title">Thoughtful Ideas for Everyday Living.</h2>
          </div>
          <div className="header-right">
            <p className="insights-header-desc">
              Explore perspectives on comfortable living, personal independence, and creating spaces
              that truly feel like home.
            </p>
            <a href="#insights" className="btn-outline-on-light" aria-describedby="insights-pending-note">
              VIEW INSIGHTS
            </a>
          </div>
        </div>

        {/* 3 Article Cards — proposed editorial titles, pending publication */}
        <div className="articles-grid">
          {insightsArticles.map((article) => {
            const pendingTitle = article.pending ? 'Article pending publication' : undefined;
            return (
              <article key={article.id} className="article-card" data-pending={article.pending || undefined}>
                <div className="article-image-box">
                  <a href={article.href} className="article-image-link" tabIndex={-1} aria-hidden="true">
                    <img
                      src={article.image}
                      alt=""
                      className="article-img"
                      width={400}
                      height={260}
                      loading="lazy"
                    />
                  </a>
                  <div className="article-date-badge" aria-label={`Article ${article.badge.primary}, ${article.badge.secondary}`}>
                    <span className="badge-day">{article.badge.primary}</span>
                    <span className="badge-month">{article.badge.secondary}</span>
                  </div>
                </div>

                <div className="article-body">
                  <div className="article-meta">
                    <span className="meta-item">
                      <Building2 size={13} className="meta-icon" /> {article.author}
                    </span>
                    <span className="meta-item">
                      <Folder size={13} className="meta-icon" /> {article.category}
                    </span>
                  </div>

                  <h3 className="article-title">
                    <a href={article.href} className="article-title-link" title={pendingTitle}>
                      {article.title}
                    </a>
                  </h3>

                  <div className="article-footer">
                    <a
                      href={article.href}
                      className="read-more-link"
                      title={pendingTitle}
                      aria-disabled={article.pending || undefined}
                    >
                      READ MORE <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p id="insights-pending-note" className="sr-only">
          Articles are in development and will be linked when published.
        </p>
      </div>
    </section>
  );
};
