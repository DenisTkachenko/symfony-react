<?php

namespace App\Controller;

use App\Entity\Post;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Knp\Component\Pager\Pagination\SlidingPagination;
use Knp\Component\Pager\Paginator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;

class PostRestController extends FOSRestController
{
    CONST PAGE_SIZE = 10;

    /**
    * @Rest\Get("/api/posts")
    */
    public function getAction(Request $request)
    {

        $result = $this->getDoctrine()->getRepository(Post::class)->findAll();

        /**
         * @var Paginator $paginator
         */
        $paginator = $this->get('knp_paginator');
        /** @var SlidingPagination $pagination */
        $pagination = $paginator->paginate(
            $result,
            $request->query->getInt('page', 1),
            $request->query->getInt('perPage', self::PAGE_SIZE)
        );

        if (empty($pagination->getItems())) {
            return new View("there are no users exist", Response::HTTP_NOT_FOUND);
        }

        return [
            'items' => $pagination->getItems(),
            'numItemsPerPage' => $pagination->getItemNumberPerPage(),
            'totalCount' => $pagination->getTotalItemCount(),
            'page' => $request->query->getInt('page', 1),
        ];
    }

    /**
     * @Rest\Get("/api/posts/page-size")
     */
    public function getPageSizeAction(){
        return self::PAGE_SIZE;
    }


}
