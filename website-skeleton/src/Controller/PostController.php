<?php

namespace App\Controller;

use App\Entity\Post;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class PostController extends AbstractController
{

    /**
     * @Route("/create-posts", name="create_posts")
     */
    public function createPosts()
    {
        return new JsonResponse([
            'code' => 200,
        ]);
    }


    /**
     * @Template()
     * @Route("/post/browse", name="post_browse")
     */
    public function browseAction()
    {
        return [];
    }


}
