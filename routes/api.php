<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\LessonController;
use App\Http\Controllers\API\TopicController;
use App\Http\Controllers\API\PeriodicController;
use App\Http\Controllers\API\DashboardController;


Route::get('populate-outcomes', [PeriodicController::class, 'populateOutcomes']);
Route::post('check-email', [UserController::class, 'emailExist']);
Route::post('setup-user', [UserController::class, 'setupUser']);

Route::get('module-lessons', [LessonController::class, 'moduleLesson']);
Route::get('user-modules', [LessonController::class, 'userModules']);
Route::post('unlock-module', [LessonController::class, 'unlockModule']);
Route::get('fetch-topic', [LessonController::class, 'fetchTopic']);
Route::post('save-topic', [LessonController::class, 'saveTopic']);
Route::post('remove-topic', [LessonController::class, 'removeTopic']);
Route::post('publish-topic', [LessonController::class, 'publishTopic']);
Route::get('user-topic', [LessonController::class, 'userTopic']);
Route::post('update/module/number', [LessonController::class, 'updateModuleNumber']);
Route::post('update/topic/order', [LessonController::class, 'updateTopicOrder']);
Route::post('quiz/record', [LessonController::class, 'recordQuiz']);


Route::get('dashboard/quiz', [DashboardController::class, 'quizGraph']);
Route::get('dashboard/summary', [DashboardController::class, 'all']);
Route::get('dashboard/filter/type', [DashboardController::class, 'filterType']);
Route::get('dashboard/filter/summary', [DashboardController::class, 'filterContent']);


Route::get('fetch/topic/quiz/records', [TopicController::class, 'topicQuizRecords']);
Route::get('topic-quiz', [TopicController::class, 'topicQuiz']);
Route::post('compute-quiz', [TopicController::class, 'computeQuiz']);
Route::post('next-topic', [TopicController::class, 'nextTopic']);
Route::post('setting/update', [LessonController::class, 'updateTopicSetting']);


Route::get('periodic/table/all', [PeriodicController::class, 'periodicTableList']);
Route::get('combine-elements', [PeriodicController::class, 'combineElements']);
Route::get('search-end-products', [PeriodicController::class, 'endProduct']);
Route::get('periodic/all', [PeriodicController::class, 'all']);
Route::post('periodic/save', [PeriodicController::class, 'save']);
Route::post('periodic/remove', [PeriodicController::class, 'remove']);
