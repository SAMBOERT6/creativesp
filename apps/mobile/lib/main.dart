import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

void main() {
  runApp(const ProviderScope(child: CreativeSPApp()));
}

class CreativeSPApp extends StatelessWidget {
  const CreativeSPApp({super.key});

  @override
  Widget build(BuildContext context) {
    final router = GoRouter(routes: [
      GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
    ]);

    return MaterialApp.router(
      title: 'CreativeSP Mobile',
      routerConfig: router,
      theme: ThemeData.dark(useMaterial3: true),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('CreativeSP')),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Mobile app scaffold ready', style: TextStyle(fontSize: 24)),
            SizedBox(height: 12),
            Text('Flutter app for Android and iOS is prepared for expansion.'),
          ],
        ),
      ),
    );
  }
}
