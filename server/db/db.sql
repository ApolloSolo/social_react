DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS relationships;
DROP TABLE IF EXISTS likes;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    email VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    name VARCHAR(45) NOT NULL,
    cover_img TEXT,
    profile_img VARCHAR(150),
    city VARCHAR(45),
    website VARCHAR(45)
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    description VARCHAR(300),
    img VARCHAR(300),
    user_id INT NOT NULL,
    created_at DATE,
    CONSTRAINT FK_user_post FOREIGN KEY(user_id)
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    description VARCHAR(300) NOT NULL,
    user_id INT NOT NULL,
    created_at DATE,
    post_id INT,
    CONSTRAINT FK_user_comment FOREIGN KEY(user_id)
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_post_id FOREIGN KEY(post_id)
        REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE stories(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    img VARCHAR(300),
    CONSTRAINT FK_user_story FOREIGN KEY(user_id)
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE relationships(
    id SERIAL PRIMARY KEY,
    follower_user_id INT NOT NULL,
    followed_user_id INT NOT NULL,
    CONSTRAINT FK_follower_id FOREIGN KEY(follower_user_id)
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_followed_id FOREIGN KEY(followed_user_id)
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE likes(
    id SERIAL PRIMARY KEY,
    user_id INT,
    post_id INT,
    CONSTRAINT FK_user_like FOREIGN KEY(user_id)
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_post_like FOREIGN KEY(post_id)
        REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
);