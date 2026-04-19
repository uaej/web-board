<template>
    
      <!-- 새 글 작성 폼 영역 (우측 1칸) -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
          <h2 class="text-lg font-bold text-gray-900 mb-5 border-b pb-3">문의 남기기</h2>
          <form @submit.prevent="createPost" class="space-y-5">
            <div>
              <label for="title" class="block text-sm font-semibold leading-6 text-gray-900 mb-1">제목</label>
              <input v-model="newTitle" type="text" id="title" class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="제목을 입력하세요">
            </div>

            <div>
              <label for="content" class="block text-sm font-semibold leading-6 text-gray-900 mb-1">내용</label>
              <textarea v-model="newContent" id="content" rows="6" class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none" placeholder="문의 내용을 자세히 적어주세요"></textarea>
            </div>

          </form>
        </div>
      </div>
</template>
