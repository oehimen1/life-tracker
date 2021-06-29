\echo 'Delete and recreate life_track db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE life_track;
CREATE DATABASE life_track;
\connect life_track

\i life-track-schema.sql

\echo 'Delete and recreate life_track_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE life_track_test;
CREATE DATABASE life_track_test;
\connect life_track_test

\i life-track-schema.sql