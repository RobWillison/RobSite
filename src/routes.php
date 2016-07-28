<?php
// Routes

use Rob\Services\Email;

$app->post('/email', function ($request) {
    // Sample log message
    $this->logger->info("Send Email");

    $allPostVars = $request->getParsedBody();

    $email = new Email();

    $email->send($allPostVars['email'], $allPostVars['body']);

    return;
});


$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.html', $args);
});

