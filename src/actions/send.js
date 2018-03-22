req.caching = false; // ааАаПбаЕбаАаЕаМ аКббаИбаОаВаАаНаИаЕ
req.open('POST', 'ajax_getmessage.php', true);

// ааОббаЛаАаЕаМ аДаАаНаНбаЕ аЗаАаПбаОбаА (аЗаАаДаАбббб аВ аВаИаДаЕ бббаА).
req.send({ k:k, topic_id:topic_id, message_n:message_n, direction:direction});

