package com.chat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chat.dao.Chat;

public interface ChatRepository extends MongoRepository<Chat, String>{

	Page<Chat> findAll(Pageable pageable);
	Page<Chat> findAllByRoom(String chat, Pageable pageable);
  ArrayList<Chat> findAll();
	Chat findTopByOrderByIdDesc();
	ArrayList<Chat> findByIdGreaterThan(int id);



}
