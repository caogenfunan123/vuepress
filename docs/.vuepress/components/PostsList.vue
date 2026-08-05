<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="empty">
      <p>暂无文章</p>
    </div>
    <ul v-else class="post-ul">
      <li v-for="post in posts" :key="post.path" class="post-item">
        <a :href="post.path" class="post-link">
          <h3 class="post-title">{{ post.title || post.path }}</h3>
        </a>
        <div class="post-meta">
          <span v-if="post.frontmatter.date" class="post-date">{{ formatDate(post.frontmatter.date) }}</span>
          <span
            v-for="tag in (post.frontmatter.tags || [])"
            :key="tag"
            class="post-tag"
          >{{ tag }}</span>
        </div>
        <p v-if="post.frontmatter.description" class="post-desc">{{ post.frontmatter.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PostsList",
  computed: {
    posts() {
      // 从 VuePress 的 $site.pages 中筛选出 /posts/ 下的文章页面
      return this.$site.pages
        .filter((p) => {
          return (
            p.path.startsWith("/posts/") &&
            p.path !== "/posts/" &&
            p.path !== "/posts/index.html"
          );
        })
        .sort((a, b) => {
          const dateA = new Date(a.frontmatter.date || 0);
          const dateB = new Date(b.frontmatter.date || 0);
          return dateB - dateA;
        });
    },
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      if (isNaN(d)) return dateStr;
      return d.toISOString().split("T")[0];
    },
  },
};
</script>

<style scoped>
.post-list {
  margin-top: 1rem;
}
.post-ul {
  list-style: none;
  padding: 0;
}
.post-item {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: box-shadow 0.2s;
}
.post-item:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.post-link {
  text-decoration: none;
  color: #0070f3;
}
.post-title {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}
.post-meta {
  font-size: 0.85rem;
  color: #888;
}
.post-date {
  margin-right: 0.5rem;
}
.post-tag {
  display: inline-block;
  margin-right: 0.3rem;
  padding: 2px 8px;
  background: #f4f4f4;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #666;
}
.post-desc {
  margin: 0.5rem 0 0;
  color: #555;
  font-size: 0.9rem;
}
</style>
