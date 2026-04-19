// Business Logic Layer (서비스 역할)
const postDac = require('../dac/post.dac');

module.exports = {
  getPostList: async () => {
    // 데이터의 가공, 검증, 부가 로직 등이 필요하다면 이 계층에서 수행합니다.
    const posts = await postDac.findAllPosts();
    return posts;
  },

  writePost: async (title, content, author) => {
    // 비즈니스 로직 - 핵심 검증
    if (!title || !title.trim()) {
      throw new Error('게시글 제목은 필수입니다.');
    }
    if (!content || !content.trim()) {
      throw new Error('게시글 내용은 필수입니다.');
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      author: author || '익명 고객'
    };

    // 검증 통과 후 Data Access 계층으로 저장 요청
    const newPost = await postDac.createPost(postData);
    return newPost;
  }
};
