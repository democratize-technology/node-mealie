# Comments API

The Comments API allows you to manage recipe comments within Mealie. This service provides full CRUD operations for comments as well as pagination and filtering capabilities.

## Overview

The `CommentsService` extends the base `MealieClient` and provides the following functionality:

- Get all comments with filtering and pagination
- Create new comments
- Get individual comments
- Update existing comments
- Delete comments

## Usage

First, instantiate the service:

```typescript
import { CommentsService } from 'mealie-client';

const commentsService = new CommentsService({ baseUrl: 'https://your-mealie-instance.com' });
```

### Get All Comments

Retrieve a paginated list of comments with optional filtering:

```typescript
// Basic usage
const comments = await commentsService.getAllComments();

// With pagination and filtering
const filteredComments = await commentsService.getAllComments({
  page: 1,
  perPage: 20,
  orderBy: 'createdAt',
  orderDirection: 'desc',
  queryFilter: 'great recipe',
});
```

### Create a Comment

Add a new comment to a recipe:

```typescript
const newComment = await commentsService.createComment({
  recipeId: 'recipe-uuid',
  text: 'This recipe is amazing! I made it twice already.',
});
```

### Get a Specific Comment

Retrieve a single comment by ID:

```typescript
const comment = await commentsService.getComment('comment-uuid');
```

### Update a Comment

Update the text of an existing comment:

```typescript
const updatedComment = await commentsService.updateComment('comment-uuid', {
  id: 'comment-uuid',
  text: 'Updated: This recipe is even better with less salt.',
});
```

### Delete a Comment

Remove a comment:

```typescript
const result = await commentsService.deleteComment('comment-uuid');
```

## Types

### RecipeCommentOut

```typescript
interface RecipeCommentOut {
  id: string;
  recipeId: string;
  text: string;
  userId: string;
  user: UserBase;
  createdAt: string;
  updatedAt: string;
}
```

### RecipeCommentCreate

```typescript
interface RecipeCommentCreate {
  recipeId: string;
  text: string;
}
```

### RecipeCommentUpdate

```typescript
interface RecipeCommentUpdate {
  id: string;
  text: string;
}
```

### CommentQueryParams

```typescript
interface CommentQueryParams {
  orderBy?: string;
  orderByNullPosition?: 'first' | 'last';
  orderDirection?: 'asc' | 'desc';
  queryFilter?: string;
  paginationSeed?: string;
  page?: number;
  perPage?: number;
}
```

## Error Handling

All methods in the CommentsService will throw errors if:

- The network request fails
- The API returns a non-200 response
- The response cannot be parsed as JSON

It's recommended to wrap API calls in try-catch blocks:

```typescript
try {
  const comment = await commentsService.getComment('comment-id');
} catch (error) {
  console.error('Failed to fetch comment:', error);
}
```

## Authentication

All endpoints require authentication via OAuth2PasswordBearer. Make sure to configure your client with appropriate authentication headers before making requests.

## Example: Comment Management Flow

```typescript
import { CommentsService } from 'mealie-client';

async function manageComments() {
  const commentsService = new CommentsService({ 
    baseUrl: 'https://your-mealie-instance.com',
    // Include authentication headers
  });

  try {
    // Create a new comment
    const newComment = await commentsService.createComment({
      recipeId: 'recipe-123',
      text: 'This looks delicious!',
    });
    console.log('Created comment:', newComment.id);

    // Update the comment
    const updatedComment = await commentsService.updateComment(newComment.id, {
      id: newComment.id,
      text: 'This looks delicious! I added some extra spices.',
    });
    
    // Get all comments for the recipe
    const comments = await commentsService.getAllComments({
      queryFilter: 'recipe-123',
      orderDirection: 'desc',
    });
    console.log(`Found ${comments.items.length} comments`);

    // Delete the comment
    await commentsService.deleteComment(newComment.id);
    console.log('Comment deleted');

  } catch (error) {
    console.error('Error managing comments:', error);
  }
}
```
