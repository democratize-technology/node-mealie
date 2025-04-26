import { CommentsService } from '../dist/index.js';

/**
 * Example: Managing Recipe Comments
 * 
 * This example demonstrates how to use the CommentsService to:
 * 1. List all comments with pagination and filtering
 * 2. Create a new comment
 * 3. Update a comment
 * 4. Delete a comment
 */

async function example() {
  // Configure service
  const service = new CommentsService({
    baseUrl: process.env.MEALIE_API_URL || 'https://demo.mealie.io',
    token: process.env.MEALIE_TOKEN,
  });

  try {
    // 1. List all comments with pagination and filtering
    console.log('\n=== Get All Comments ===');
    const comments = await service.getAllComments({
      page: 1,
      perPage: 10,
      orderBy: 'createdAt',
      orderDirection: 'desc',
    });
    console.log(`Total comments: ${comments.total}`);
    console.log(`Page ${comments.page} of ${comments.total_pages}`);
    comments.items.forEach((comment) => {
      console.log(`- ${comment.user.username}: ${comment.text.substring(0, 50)}...`);
    });

    // 2. Create a new comment on a recipe
    console.log('\n=== Create Comment ===');
    // Note: Replace with a valid recipe ID from your instance
    const recipeId = 'your-recipe-id';
    const newComment = await service.createComment({
      recipeId: recipeId,
      text: 'This recipe looks fantastic! I made it last night and everyone loved it.',
    });
    console.log(`Created comment with ID: ${newComment.id}`);
    console.log(`Comment text: ${newComment.text}`);
    console.log(`Created by: ${newComment.user.fullName}`);

    // 3. Update the comment
    console.log('\n=== Update Comment ===');
    const updatedComment = await service.updateComment(newComment.id, {
      id: newComment.id,
      text: 'This recipe looks fantastic! I made it last night and added some fresh basil - everyone loved it.',
    });
    console.log(`Updated comment: ${updatedComment.text}`);

    // 4. Get a specific comment
    console.log('\n=== Get Specific Comment ===');
    const specificComment = await service.getComment(newComment.id);
    console.log(`Comment ID: ${specificComment.id}`);
    console.log(`Recipe ID: ${specificComment.recipeId}`);
    console.log(`Author: ${specificComment.user.fullName}`);
    console.log(`Created: ${new Date(specificComment.createdAt).toLocaleString()}`);
    console.log(`Updated: ${new Date(specificComment.updatedAt).toLocaleString()}`);

    // 5. Delete the comment
    console.log('\n=== Delete Comment ===');
    const deleteResult = await service.deleteComment(newComment.id);
    console.log('Comment deleted successfully:', deleteResult.message);

    // 6. Advanced filtering - search for comments containing a keyword
    console.log('\n=== Advanced Filtering ===');
    const filteredComments = await service.getAllComments({
      queryFilter: 'delicious',
      orderBy: 'createdAt',
      orderDirection: 'desc',
      perPage: 5,
    });
    console.log(`Found ${filteredComments.total} comments containing 'delicious'`);
    filteredComments.items.forEach((comment) => {
      console.log(`- ${comment.user.username}: ${comment.text}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      const errorText = await error.response.text();
      console.error('Details:', errorText);
    }
  }
}

// Run the example
example();
