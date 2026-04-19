<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const newTitle = ref('')
const newContent = ref('')
const loading = ref(true)
const error = ref(null)

const API_URL = 'http://localhost:3000/api/posts'

// Backend Mock API 호출 (글 목록 가져오기)
const fetchPosts = async () => {
  try {
    loading.value = true
    const response = await fetch(API_URL)
    const json = await response.json()
    if (json.success) {
      posts.value = json.data
    } else {
      error.value = json.message
    }
  } catch (err) {
    error.value = '서버 통신에 실패했습니다. 백엔드 서버가 켜져있는지 확인하세요.'
  } finally {
    loading.value = false
  }
}

// 새 글 작성 (POST 요청)
const createPost = async () => {
  if (!newTitle.value || !newContent.value) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle.value,
        content: newContent.value,
        author: '회원고객'
      })
    })
    const json = await response.json()
    if (json.success) {
      // 목록 갱신 및 폼 초기화
      newTitle.value = ''
      newContent.value = ''
      fetchPosts()
    } else {
      alert(json.message)
    }
  } catch (err) {
    alert('게시글 작성에 실패했습니다.')
  }
}

onMounted(() => {
  fetchPosts()
})

</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
    <!-- Header -->
    <header class="w-full max-w-4xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-5 border-gray-200">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">고객 게시판</h1>
        <p class="text-sm text-gray-500 mt-2">투명하고 안전한 서비스를 위한 소통 공간입니다.</p>
      </div>
      <div class="mt-4 md:mt-0">
        <span class="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
          Vue + Express (web/biz/dac) + Mock DB
        </span>
      </div>
    </header>

    <main class="w-full max-w-4xl grid grid-cols-1 gap-8 lg:grid-cols-3">
      
      <!-- 글 목록 렌더링 영역 (좌측/상단 2칸) -->
      <div class="lg:col-span-2 space-y-4">
        
        <!-- 로딩 표시 -->
        <div v-if="loading" class="animate-pulse space-y-4">
          <div v-for="i in 3" :key="i" class="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col space-y-3">
            <div class="h-5 bg-gray-200 rounded-md w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded-md w-full"></div>
            <div class="h-4 bg-gray-200 rounded-md w-5/6"></div>
          </div>
        </div>
        
        <!-- 에러 표시 -->
        <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-600 border border-red-200 flex items-center">
          <svg class="h-6 w-6 mr-3 border-red-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="font-medium font-sans">{{ error }}</span>
        </div>

        <!-- 게시물 표시 -->
        <ul v-else-if="posts.length > 0" class="space-y-4">
          <li v-for="post in posts" :key="post.id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-[17px] font-semibold text-gray-900 leading-snug">{{ post.title }}</h3>
              <span class="text-xs text-gray-400 font-medium tracking-wide">
                {{ new Date(post.createdAt).toLocaleDateString() }}
              </span>
            </div>
            <p class="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">{{ post.content }}</p>
            <div class="flex items-center justify-between border-t pt-3 border-gray-50 flex-row-reverse">
              <span class="text-[13px] text-gray-500">번호: {{ post.id }}</span>
              <span class="text-[13px] font-medium text-blue-600 drop-shadow-sm">
                작성자: {{ post.author }}
              </span>
            </div>
          </li>
        </ul>

        <!-- 빈 목록 표시 -->
        <div v-else class="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p class="text-gray-500 font-medium">등록된 게시물이 없습니다.</p>
        </div>
      </div>

      <button type="submit" class="w-full h-20 flex justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200">
        게시글 등록
      </button>
    </main>
  </div>
</template>

<style>
/* 추가적인 미세조정 스타일 */
</style>
