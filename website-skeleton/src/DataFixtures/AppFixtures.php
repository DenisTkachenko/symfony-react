<?php

namespace App\DataFixtures;

use App\Entity\Author;
use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * AppFixtures constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 6; $i++){
            $author = new Author();
            $author->setFirstName($faker->firstName($gender = 'male'|'female'));
            $author->setLastName($faker->lastName);
            $author->setPassword( $this->encoder->encodePassword($author, '123123'));
            $manager->persist($author);
        }
        $manager->flush();

        $authors = $manager->getRepository(Author::class)->findAll();

        for ($i = 0; $i < 20; $i++){
            $post = new Post();
            $post->setTitle($faker->sentence($nbWords = 6, $variableNbWords = true));
            $post->setContent($faker->paragraphs($nb = 3, $asText = true));
            $post->setAuthor($authors[array_rand($authors)]);
            $manager->persist($post);
        }
        $manager->flush();

    }
}